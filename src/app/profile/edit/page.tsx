import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { UserWithRole } from "@/types/morePrismaTypes";
import Link from "next/link";
import { redirect } from "next/navigation";

async function updateProfile(data: FormData) {
  "use server";
  const user = await requirePermission("scanQr");

  const aboutMe = data.get("about-me") as string;

  const instagramHandle = data.get("instagram-handle") as string;
  const linkedInHandle = data.get("linkedin-handle") as string;
  const twitterHandle = data.get("twitter-handle") as string;

  const link1Name = data.get("link-1-name") as string;
  const link1Url = data.get("link-1-url") as string;
  const link2Name = data.get("link-2-name") as string;
  const link2Url = data.get("link-2-url") as string;

  const profile = {
    aboutMe,
    instagramHandle,
    linkedInHandle,
    twitterHandle,
    link1Name,
    link1Url,
    link2Name,
    link2Url,
  };

  let userProfile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userProfile) {
    await prisma.profile.create({
      data: {
        ...profile,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } else {
    await prisma.profile.update({
      where: {
        id: userProfile.id,
      },
      data: profile,
    });
  }

  return redirect("/");
}

export default async function EditProfile() {
  const user = await requirePermission("scanQr");

  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  return (
    <div>
      <Header title="Edit Profile" description="Modify parts of your profile" />
      <form
        action={updateProfile}
        className="p-4 flex flex-col gap-6 mx-auto w-fit mb-16 md:mb-0"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Basic Info</h2>
          <Input
            placeholder="Name"
            className="max-w-lg"
            disabled={true}
            defaultValue={`${user.firstName} ${user.lastName}`}
          ></Input>
          <Input
            placeholder="Type"
            className="max-w-lg"
            disabled={true}
            defaultValue={`${user.role.name
              .at(0)
              ?.toUpperCase()}${user.role.name.slice(1)}`}
          ></Input>
          <Textarea
            placeholder="About Me"
            name="about-me"
            rows={8}
            cols={50}
            defaultValue={userProfile?.aboutMe ?? ""}
            className="max-w-lg"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold text-xl">Social Handles</h2>
            <p>Let others know how to connect with you!</p>
          </div>

          <Input
            placeholder="Instagram"
            ghostPlaceholder="tedxcolumbialakeyouth"
            className="max-w-lg"
            name="instagram-handle"
            defaultValue={userProfile?.instagramHandle ?? ""}
          ></Input>
          <Input
            placeholder="Linkedin"
            ghostPlaceholder="tedxcolumbialakeyouth"
            className="max-w-lg"
            name="linkedin-handle"
            defaultValue={userProfile?.linkedInHandle ?? ""}
          ></Input>
          <Input
            placeholder="Twitter"
            ghostPlaceholder="TEDxColumbiaY"
            className="max-w-lg"
            name="twitter-handle"
            defaultValue={userProfile?.twitterHandle ?? ""}
          ></Input>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold text-xl">Other Links</h2>
            <p>Add up to 2 extra links</p>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name"
              className="max-w-lg"
              name="link-1-name"
              defaultValue={userProfile?.link1Name ?? ""}
            ></Input>
            <Input
              placeholder="Link"
              className="max-w-lg"
              name="link-1-url"
              defaultValue={userProfile?.link1Url ?? ""}
            ></Input>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              placeholder="Name"
              className="max-w-lg"
              name="link-2-name"
              defaultValue={userProfile?.link2Name ?? ""}
            ></Input>
            <Input
              placeholder="Link"
              className="max-w-lg"
              name="link-2-url"
              defaultValue={userProfile?.link2Url ?? ""}
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="w-24" type="button">
              Cancel
            </Button>
          </Link>
          <Button className="w-24">Save</Button>
        </div>
      </form>
    </div>
  );
}
