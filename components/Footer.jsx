export default function Footer() {
  return (
    <div className="w-full mt-20 text-muted-foreground ">
      <div className="w-full border border-muted-foreground opacity-10 "></div>
      <div className="flex flex-col items-center justify-center h-24 gap-1 font-mono text-sm opacity-70">
        <p>陕ICP备2026012647号</p>
        <p>
          &copy; {new Date().getFullYear()} omnijk. All rights reserved.
        </p>
        <div className=" opacity-90">Made with love and 🍰</div>
        {/* <p className="text-xs opacity-95"> */}
        <p>
          本网站内容仅供学习与交流使用，如有侵权或不当内容请联系删除。
        </p>
      </div>
    </div>
  );
}
