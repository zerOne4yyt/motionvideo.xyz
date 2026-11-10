import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { getHTMLTextDir } from "intlayer";

import { FeedbackDialogProvider } from "@/components/feedback-dialog";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts";
import { LocaleProvider } from "@/components/locale-provider";
import { NotFound } from "@/components/not-found";
import { PageBottomBlur } from "@/components/progressive-blur";
import { SignInDialogProvider } from "@/components/sign-in-dialog";
import { SoundEffects } from "@/components/ui/sound";
import { localeFromPath } from "@/constants/locales";
import { themeScript } from "@/lib/theme";
import { baseMetadata } from "@/seo/metadata";

import fontsCss from "../styles/fonts.css?url";
import appCss from "../styles/globals.css?url";

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  // The locale is a route param on every page (`/{-$locale}/...`); reading the
  // pathname here also covers dialogs and error pages rendered above the
  // locale layout.
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const locale = localeFromPath(pathname);

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col antialiased">
        <LocaleProvider locale={locale}>
          <aside className="bg-muted border-b px-4 py-2 text-center text-xs">
            个人只读参考站 · 非 MotionVideo 官方服务 · 案例媒体来自原站
            CDN。登录、支付与 Pro 技能未启用。{" "}
            <a
              className="underline"
              href="https://github.com/zerOne4yyt/motionvideo.xyz"
              target="_blank"
              rel="noreferrer"
            >
              源码 / MIT 署名
            </a>
          </aside>
          <SignInDialogProvider>
            <FeedbackDialogProvider>
              <KeyboardShortcutsProvider>
                <SoundEffects>{children}</SoundEffects>
              </KeyboardShortcutsProvider>
            </FeedbackDialogProvider>
          </SignInDialogProvider>
        </LocaleProvider>
        <PageBottomBlur />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRoute({
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      // Own stylesheet so HMR on app CSS never re-resolves the font.
      { href: fontsCss, rel: "stylesheet" },
      ...baseMetadata.links,
    ],
    meta: baseMetadata.meta,
    scripts: [{ children: themeScript }],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
