

const LoadingState = () => {
  return (
   <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin" />
    <p className="text-slate-500 font-black text-xs uppercase tracking-widest">
      Syncing your workflow...
    </p>
  </div>
  )
}

export default LoadingState