const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //  To put things at the middle
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  )
}

export default AuthLayout;