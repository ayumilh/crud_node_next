import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import FuncionariosContent from "@/components/Funcionarios/FuncionariosContent";


export default async function Funcionarios() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <FuncionariosContent />
    </main>
  );
}