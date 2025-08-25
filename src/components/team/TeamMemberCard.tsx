import Image from 'next/image';
import { TeamMember } from '@/types/content';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Foto del miembro */}
        <div className="mx-auto flex-shrink-0 sm:mx-0">
          {member.imageUrl ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="from-navy flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br to-blue-700 transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32">
              <span className="text-xl font-bold text-white sm:text-2xl">
                {member.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
          )}
        </div>

        {/* Información del miembro */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <h3 className="text-navy font-serif text-xl font-bold transition-colors group-hover:text-blue-600 sm:text-2xl">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-blue-600 sm:text-base">
              {member.position}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="bg-navy/10 text-navy inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
              {member.area}
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {member.city}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              {member.level}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm leading-relaxed text-gray-600">{member.bio}</p>

          {/* Enlaces de contacto */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 sm:justify-start">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="hover:border-navy hover:text-navy focus:ring-navy inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-xs transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contactar
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-navy hover:text-navy focus:ring-navy inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-xs transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
                LinkedIn
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-navy hover:text-navy focus:ring-navy inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-xs transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
