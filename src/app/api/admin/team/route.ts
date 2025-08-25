import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { teamMemberSchema, sanitizeInput } from '../../../../utils/validations';

const TEAM_FILE_PATH = path.join(process.cwd(), 'src/data/team.json');

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  imageUrl: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  area: string;
  city: string;
  level: string;
  order?: number;
}

// Función para leer el archivo de equipo
function readTeamData(): TeamMember[] {
  try {
    if (fs.existsSync(TEAM_FILE_PATH)) {
      const data = fs.readFileSync(TEAM_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error al leer datos del equipo:', error);
    return [];
  }
}

// Función para escribir el archivo de equipo
function writeTeamData(team: TeamMember[]): void {
  try {
    const dir = path.dirname(TEAM_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Crear backup antes de escribir
    const backupPath = TEAM_FILE_PATH + '.backup';
    if (fs.existsSync(TEAM_FILE_PATH)) {
      fs.copyFileSync(TEAM_FILE_PATH, backupPath);
    }
    
    fs.writeFileSync(TEAM_FILE_PATH, JSON.stringify(team, null, 2));
  } catch (error) {
    console.error('Error al escribir datos del equipo:', error);
    throw new Error('Error al guardar los datos del equipo');
  }
}

// GET - Obtener todos los miembros del equipo
export async function GET() {
  try {
    const team = readTeamData();
    
    // Ordenar por campo order si existe, luego por id
    const sortedTeam = team.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      }
      if (a.order) return -1;
      if (b.order) return 1;
      return a.id.localeCompare(b.id);
    });
    
    return NextResponse.json(sortedTeam);
  } catch (error) {
    console.error('Error al obtener equipo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo miembro del equipo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validationResult = teamMemberSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const memberData = validationResult.data;
    
    // Sanitizar campos de texto
    memberData.name = sanitizeInput(memberData.name);
    memberData.position = sanitizeInput(memberData.position);
    memberData.bio = memberData.bio ? sanitizeInput(memberData.bio) : undefined;
    memberData.area = sanitizeInput(memberData.area);
    memberData.city = sanitizeInput(memberData.city);
    memberData.level = sanitizeInput(memberData.level);

    const team = readTeamData();

    // Verificar si el email ya existe
    const existingMember = team.find(member => 
      member.email.toLowerCase() === memberData.email.toLowerCase()
    );
    if (existingMember) {
      return NextResponse.json(
        { error: 'Ya existe un miembro con este email' },
        { status: 409 }
      );
    }

    // Crear nuevo miembro
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
      order: memberData.order || team.length + 1,
      imageUrl: memberData.imageUrl || '/images/team/default-avatar.jpg',
    };

    team.push(newMember);
    writeTeamData(team);

    console.info('Nuevo miembro del equipo creado:', {
      id: newMember.id,
      name: newMember.name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error al crear miembro del equipo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar miembro del equipo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID del miembro requerido' },
        { status: 400 }
      );
    }

    const team = readTeamData();
    const memberIndex = team.findIndex(member => member.id === id);

    if (memberIndex === -1) {
      return NextResponse.json(
        { error: 'Miembro no encontrado' },
        { status: 404 }
      );
    }

    const deletedMember = team[memberIndex];
    team.splice(memberIndex, 1);
    writeTeamData(team);

    console.info('Miembro del equipo eliminado:', {
      id: deletedMember.id,
      name: deletedMember.name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      message: 'Miembro eliminado exitosamente',
      deletedMember 
    });
  } catch (error) {
    console.error('Error al eliminar miembro del equipo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
