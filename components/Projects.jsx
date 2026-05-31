import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Projects({ projects }) {
  return (
    <section>
      <ul className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <li key={project._id} className="h-full">
            <Link href={project.link} target="_blank" className="block h-full">
              <div className="project-card group relative flex h-full min-h-[260px] flex-col items-start gap-6 overflow-hidden rounded-2xl border border-border/60 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/40 hover:shadow-2xl focus-visible:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-80" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/10 shadow-[0_0px_18px_rgba(56,189,248,0.16)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Image
                    src={project.imageUrl}
                    alt="Project image"
                    width={36}
                    height={36}
                    unoptimized
                    className="object-contain drop-shadow-sm"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="mb-4 font-semibold tracking-wide transition-colors duration-200 group-hover:text-sky-300">
                    {project.title}
                  </h2>
                  <p className="text-sm font-light text-muted-foreground transition-colors duration-200 group-hover:text-foreground/80">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-center gap-2 text-sm rounded-full border border-border/40 bg-background/40 px-3 py-1 text-muted-foreground transition-all duration-200 group-hover:border-sky-300/30 group-hover:bg-sky-400/10 group-hover:text-foreground">
                  <p>{new URL(project.link).host}</p>
                  <ExternalLink className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
