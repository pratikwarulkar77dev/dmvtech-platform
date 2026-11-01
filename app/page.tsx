"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Container,
  Section,
  Heading,
  Badge,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Skeleton,
  Spinner,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Breadcrumb,
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <main className="min-h-screen py-16">
      <Container>
        <div className="flex items-center justify-between">
          <p className="text-caption">Module 4 — Design System</p>
          <ThemeToggle />
        </div>

        <Breadcrumb
          className="mt-6"
          items={[{ label: "Home", href: "/" }, { label: "Design System" }]}
        />

        <Heading size="h1" as="h1" className="mt-8">
          DMV Tech Design System
        </Heading>
        <p className="text-body-lg mt-4 max-w-2xl text-muted-foreground">
          21 reusable, accessible components — the foundation the Navbar, Hero,
          and homepage sections will be built from in later modules.
        </p>
      </Container>

      <Section spacing="sm">
        <Container>
          <Heading size="h3">Buttons</Heading>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
            <Button isLoading={loading} onClick={() => setLoading((v) => !v)}>
              {loading ? "Loading..." : "Click to load"}
            </Button>
            <Button size="icon" aria-label="Icon button">
              <Spinner size="sm" />
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <Heading size="h3">Badges</Heading>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <Heading size="h3">Cards</Heading>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Network Design</CardTitle>
                <CardDescription>End-to-end planning and deployment.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="success">Live</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cloud Migration</CardTitle>
                <CardDescription>Assessment and architecture support.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IT Consulting</CardTitle>
                <CardDescription>Strategic technology guidance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="success">Live</Badge>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container size="narrow">
          <Heading size="h3">Form Elements</Heading>
          <div className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6 shadow-soft">
            <Input placeholder="Full name" />
            <Input placeholder="Invalid email" invalid defaultValue="not-an-email" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">Network Design</SelectItem>
                <SelectItem value="cctv">CCTV Surveillance</SelectItem>
                <SelectItem value="cloud">Cloud Migration</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Tell us about your project" />
            <Button
              onClick={() =>
                toast({ title: "Message sent", description: "We'll be in touch within one business day." })
              }
            >
              Trigger Toast
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <Heading size="h3">Overlays</Heading>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm action</DialogTitle>
                  <DialogDescription>This is a fully keyboard-accessible modal dialog.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Confirm</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerHeader>
                  <DrawerTitle>Panel</DrawerTitle>
                  <DrawerDescription>Slides in from the side, built on the same Dialog primitive.</DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Dropdown</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltips use a 200ms open delay.</TooltipContent>
            </Tooltip>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container size="narrow">
          <Heading size="h3">Accordion</Heading>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>What services does DMV Tech offer today?</AccordionTrigger>
              <AccordionContent>
                Network design, AMC support, CCTV, biometric access control, and website development.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What's coming next?</AccordionTrigger>
              <AccordionContent>
                Custom software and cloud migration services, currently in development.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container size="narrow">
          <Heading size="h3">Tabs</Heading>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-body-sm">Overview panel content.</p>
            </TabsContent>
            <TabsContent value="details">
              <p className="text-body-sm">Details panel content.</p>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <Heading size="h3">Avatars, Skeletons &amp; Separator</Heading>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Avatar>
              <AvatarImage src="https://example.com/nonexistent.jpg" alt="" />
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <Spinner label="Loading content" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
