import Image from "next/image";
import styles from "./page.module.css";
import UserFormInput from "./components/UserFormInput";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserFormInput />
    </main>
  );
}
