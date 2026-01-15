

const DashboardBackground = () => {
  return (
   <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-950/20 rounded-full blur-[100px]" />
  </div>
  )
}

export default DashboardBackground