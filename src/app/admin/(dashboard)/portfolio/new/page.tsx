import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New portfolio item</h1>
      <div className="mt-6">
        <PortfolioForm />
      </div>
    </div>
  );
}
