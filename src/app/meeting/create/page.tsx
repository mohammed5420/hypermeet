import { GanttChart, NotepadTextDashed } from 'lucide-react'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Textarea } from '~/components/ui/textarea'

const Page = () => {
  return (
    <main className='flex h-[90vh] justify-center items-center'>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className='flex gap-2'><GanttChart /> Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className='border-none bg-zinc-900'>
            <CardContent className='p-4 flex flex-col gap-4 items-center'>
              <NotepadTextDashed className='text-zinc-600' size={48} />
              <p>No Meet Agenda, Start with Adding Some</p>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button className='w-full'>Add Task</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <form className='grid gap-3'>
                  <div className='flex flex-col gap-4'>
                    <Label>Title</Label>
                    <Input placeholder="eg: Introduction" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Type your message here." />
                  </div>
                  <div>
                    <Label>Estmated Duration</Label>
                    <Input placeholder="eg: Introduction" />
                  </div>
                </form>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="secondary" className="w-full">
            Start Meeting
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
