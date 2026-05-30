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
              <div className="relative flex h-full min-h-[260px] flex-col items-start gap-6 rounded-2xl border border-border/60 bg-[#f2f2f21a] p-5 hover:border-muted-foreground hover:bg-muted">
                <div className="relative flex items-center justify-center w-12 h-12 shadow-[0_0px_3px_rgb(180,180,180)] rounded-full ">
                  <Image
                    src={project.imageUrl}
                    alt="Project image"
                    width={36}
                    height={36}
                    unoptimized
                    className="object-contain "
                  />
                </div>

                <div className="flex-1">
                  <h2 className="mb-4 font-semibold">{project.title}</h2>
                  <p className="text-sm font-light text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-center gap-2 text-sm">
                  <p>{new URL(project.link).host}</p>
                  <ExternalLink className="size-4" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
