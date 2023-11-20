type Props = {
  children: React.ReactNode;
  isReponsive?: boolean;
};

const responsiveGridStyle = () => {
  return `md:grid-cols-4 md:gap-7 grid-cols-2 gap-4 `;
};

const GridContainer = ({ children, isReponsive = true }: Props) => {
  return (
    <div
      className={`w-full grid ${
        isReponsive ? responsiveGridStyle() : "grid-cols-3 gap-4"
      } }`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
