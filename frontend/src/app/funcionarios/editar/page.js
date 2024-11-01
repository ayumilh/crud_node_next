import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import FormEditarFuncionarios from '@/components/Funcionarios/Editar/FormEditarFuncionarios';
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';

export default async function Editar() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="px-4 pt-4 lg:px-6 mx-auto flex flex-col items-center">
      <div className="w-full xl:max-w-[1300px] flex justify-between items-center h-12 mb-6 md:mb-8 lg:mb-10">
        <BtnBackPage title="Editar Funcionario" modal={false} />
      </div>

      <FormEditarFuncionarios />
    </main>
  );
}