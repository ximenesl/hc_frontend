import { useCallback } from 'react';

const useAuth = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || '';

  const logout = useCallback(() => {
    localStorage.clear();
  }, []);

  const saveSession = useCallback(({ token, nome, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', nome);
    localStorage.setItem('userRole', role);
  }, []);

  const isAuthenticated = !!token;
  const isAdmin = userRole === 'ADMIN';
  const isCoordenador = userRole === 'COORDENADOR';
  const isAluno = userRole === 'ALUNO';

  return { token, userName, userRole, isAuthenticated, isAdmin, isCoordenador, isAluno, logout, saveSession };
};

export default useAuth;
