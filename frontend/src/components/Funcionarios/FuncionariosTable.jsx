'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FuncionariosRow from './FuncionariosRow';
import { FuncionariosMenuMoreResponsive } from './Actions/FuncionariosMenuMoreResponsive';

const FuncionariosTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get("https://pos-backend-six.vercel.app/api/funcionarios/get");
                if (response.data && Array.isArray(response.data.funcionarios)) {
                    const restructuredData = response.data.funcionarios.map((funcionario) => {
                        return {
                            codigo: funcionario.func_codigo,
                            nome: funcionario.func_nome,
                            cargo: funcionario.func_cargo,
                            celular: funcionario.func_celular,
                            bairro: funcionario.func_bairro,
                        };
                    });
                    setFuncionarios(restructuredData);
                    setTotalPages(Math.ceil(restructuredData.length / rowsPerPage));
                } else {
                    setFuncionarios([]);
                    setTotalPages(1);
                }
            } catch (error) {
                setFuncionarios([]);
                setTotalPages(1);
            }
        };

        fetchFuncionarios();
    }, [rowsPerPage, currentPage]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedFuncionarios = funcionarios.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setTotalPages(Math.ceil(funcionarios.length / newRowsPerPage));
        handlePageChange(1);
    };


    return (
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <FuncionariosMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-3 md:py-4 text-sm font-semibold text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Nome</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Cargo</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Celular</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Bairro</th>
                        <th className="pl-4 pr-6 py-3 md:py-4"></th>
                    </tr>
                </thead>
                <tbody>
                    <FuncionariosRow funcionarios={paginatedFuncionarios} />
                </tbody>
            </table>
        </div>
    );
};

export default FuncionariosTable;