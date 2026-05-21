"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function userInitials(name?: string | null, email?: string | null) {
  const source = name ?? email ?? "?";
  const parts = source.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function AuthActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled>
        Loading…
      </Button>
    );
  }

  if (status === "authenticated" && session?.user) {
    const { name, email, image } = session.user;
    const displayTitle = name ?? email ?? "Guest";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" className="max-w-[200px] gap-2 pl-1.5">
              <Avatar className="size-6">
                {image ? <AvatarImage src={image} alt={displayTitle} /> : null}
                <AvatarFallback className="text-[10px]">
                  {userInitials(name, email)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{displayTitle}</span>
              <ChevronDown className="size-3.5 shrink-0 opacity-60" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="min-w-[280px] w-80 p-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-2 py-2 font-normal">
              <p className="text-sm font-medium">{displayTitle}</p>
              {email ? (
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {email}
                </p>
              ) : null}
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => signIn("google")}
      className="gap-2"
    >
      <GoogleIcon />
      Google
    </Button>
  );
}
