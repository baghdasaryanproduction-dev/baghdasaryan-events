import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New service</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}
