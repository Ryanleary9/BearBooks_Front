import "./header.scss";

type HeaderProps = { children: JSX.Element };
export function Header({ children }: HeaderProps) {
  return (
    <>
      <div className="header">
        <span className="header_span">
          <img
            src="../../../img/pngwing.com.png"
            alt="Bear Books logo"
            className="logo"
          ></img>
          {children}
        </span>
      </div>
    </>
  );
}
