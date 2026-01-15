import { AssignmentLate } from "@mui/icons-material";

const EmptyState = () => {
  return (
   <div className="flex h-[70vh] flex-col items-center justify-center text-center px-6">
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-full mb-6 text-indigo-500/50">
      <AssignmentLate />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">
      Ready to be productive?
    </h3>
    <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">
      Select a collection from the sidebar to start managing your
      daily objectives.
    </p>
  </div>
  )
}

export default EmptyState