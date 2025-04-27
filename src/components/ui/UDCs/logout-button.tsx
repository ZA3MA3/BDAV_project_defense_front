// components/ui/logout-button.tsx
import { Button } from "../../../components/ui/button"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // optional: clear auth/token logic here
    navigate("/") 
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}

export default LogoutButton
