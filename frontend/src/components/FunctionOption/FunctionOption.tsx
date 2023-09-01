import Link from "next/link";

interface FucntionOptionPorps {
  href: string;
  text: string;
  bgColor: string;
  textColor: string
}

const FucntionOption: React.FC<FucntionOptionPorps> = ({ href, text, bgColor, textColor}) => {
  return (
    <Link href={href}>
    <div className="text-xl w-4/5 py-10 text-center rounded-3xl my-10 mx-auto md:w-3/5 md:py-20 md:text-2xl" style={{backgroundColor: bgColor, color: textColor}}>
      {text}
    </div>
    </Link>
  )
};

export { FucntionOption };
