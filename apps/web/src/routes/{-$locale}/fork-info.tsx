import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ForkInfo = () => (
  <>
    <SiteHeader />
    <main className="mx-auto max-w-2xl flex-1 space-y-5 px-6 py-20">
      <h1 className="text-3xl font-semibold">个人只读参考站</h1>
      <p>
        本网站基于 Aniket Pawar 的 MotionVideo
        开源网站代码（MIT），保留公开案例目录、筛选、搜索与作者公开的提示词。它不是
        MotionVideo 官方网站，也不代表原作者提供服务。
      </p>
      <p>
        登录、云端收藏、投稿、上传、支付、Pro
        技能和原站经营条款不在此部署中提供。原站付费内容没有解锁。视频及封面直接引用原站
        CDN，没有复制到此 Cloudflare 账号，素材权利仍归各自作者。
      </p>
      <p>
        本部署不使用账号数据库、不收集表单或使用分析服务。Cloudflare
        与外部媒体服务可能处理访问日志。
      </p>
      <div className="flex flex-wrap gap-5">
        <a className="underline" href="/zh">
          返回案例目录
        </a>
        <a
          className="underline"
          href="https://motionvideo.xyz"
          target="_blank"
          rel="noreferrer"
        >
          MotionVideo 官方网站
        </a>
        <a
          className="underline"
          href="https://github.com/zerOne4yyt/motionvideo.xyz"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 源码与许可
        </a>
      </div>
    </main>
    <SiteFooter />
  </>
);
export const Route = createFileRoute("/{-$locale}/fork-info")({
  component: ForkInfo,
});
