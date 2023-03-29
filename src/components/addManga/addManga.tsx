export type FormProps = { children: JSX.Element };
import "./addManga.scss";
export default function AddManga({ children }: FormProps) {
  return (
    <span className="add-manga">
      <h1>AddManga</h1>
      {children}
    </span>
  );
}
