import { Card, CardContent } from "../ui/card";
import { ActivityIcon, LotusIcon, ManWithDesktopIcon } from "./icons";

const FEATURES = [
  {
    title: "Flexible",
    description:
      "You are at liberty to set classes in your own time, at your own pace and within your own budget.",
    icon: ActivityIcon,
  },
  {
    title: "Impactful",
    description:
      "We have a drive for imparting knowledge and building a quality environment for learning.",
    icon: LotusIcon,
  },
  {
    title: "Professional",
    description:
      "We have trusted and qualified professionals who have a passion for impact and passing on the torch.",
    icon: ManWithDesktopIcon,
  },
];

function Features() {
  return (
    <section className="flex items-center gap-6 py-[60px] max-w-fit w-full">
      {FEATURES.map((feature, index) => (
        <Card
          key={index}
          className="group flex flex-col items-center gap-10 rounded-none border-0 hover:border-x shadow-none px-6 max-w-[367px] hover:cursor-pointer"
        >
          <div className="relative flex items-center justify-center bg-pampas group-hover:bg-primary w-[170px] h-[170px] rounded-full overflow-hidden transition-all duration-300 ease-in-out">
            <div
              className="absolute top-[90%] w-[170px] h-[170px] rounded-full bg-primary group-hover:bg-secondary transition-all duration-300 ease-in-out"
              aria-hidden="true"
              role="presentation:"
            ></div>
            <feature.icon className="text-primary group-hover:text-white" />
          </div>
          <CardContent className="w-full p-0 bg-white text-center">
            <h2 className="text-3xl font-medium text-zeus mb-4 group-hover:text-secondary transition-all duration-300 ease-in-out">
              {feature.title}
            </h2>
            <p className="text-lg text-abbey ">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default Features;
