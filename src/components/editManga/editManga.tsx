export type FormProps = { children: JSX.Element };
import "./editManga.scss";
export default function EditManga({ children }: FormProps) {
  return (
    <span className="edit-manga">
      <h1>EditManga</h1>
      {children}
    </span>
  );
}
