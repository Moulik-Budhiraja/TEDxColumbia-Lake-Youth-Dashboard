import Header from "@/components/Header/Header";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import Editor from "./Editor";
import { EmailTemplate } from "@prisma/client";
import { prisma } from "@/db";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    role?: string;
  };
};

export default async function Users({ searchParams }: Props) {
  await requirePermission("admin");

  let previousTemplate: EmailTemplate | null = null;

  previousTemplate = await prisma.emailTemplate.findFirst({
    where: {
      role: {
        name: searchParams.role ?? "admin",
      },
    },
  });

  if (!previousTemplate) {
    previousTemplate = await prisma.emailTemplate.create({
      data: {
        role: {
          connect: {
            name: searchParams.role ?? "admin",
          },
        },
        subject: "",
        body: "",
      },
    });
  }

  return (
    <div className="h-screen">
      <Header
        title="Email Templates"
        description="Manage Email Templates"
      ></Header>

      <div className="w-full overflow-x-scroll">
        <Editor
          searchParams={searchParams}
          previousTemplate={previousTemplate}
        ></Editor>
      </div>
    </div>
  );
}
