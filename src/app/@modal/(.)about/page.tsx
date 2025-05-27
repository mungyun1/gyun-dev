import Modal from "@/components/Modal";
import AboutPage from "@/app/about/page";

export default function AboutModal() {
  return (
    <Modal>
      <div className="p-8">
        <AboutPage />
      </div>
    </Modal>
  );
}
