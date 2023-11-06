type Props = {
  children: React.ReactNode;
  cols?: ColsStyle;
};

type ColsStyle = "few" | "little" | "many";

const GridContainer = ({ children, cols = "little" }: Props) => {
  return <div className={`grid ${colsStyle(cols)}`}>{children}</div>;
};

export default GridContainer;

const colsStyle = (cols: ColsStyle) => {
  if (cols === "few") {
    return `grid-cols-3 gap-4`;
  } else if (cols === "little") {
    return `grid-cols-5 gap-7`;
  } else if (cols === "many") {
    return `grid-cols-7`;
  }
};
