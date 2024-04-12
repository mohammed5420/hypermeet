import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

export default async function Home() {
  return (
    <main className="text-foreground h-[90vh] p-4 flex justify-center items-center flex-col lg:flex-row">
      <Card className="text-center w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to HyperMeet</CardTitle>
          <CardDescription>The Next Generation Meeting App</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2">
            <Input type="text" placeholder="Meeting ID" />
            <Button variant="secondary">Join</Button>
          </form>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-4">
          <Separator />
          <Button className="w-full" asChild>
            <Link href="/meeting/create">Create New Meeting</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
