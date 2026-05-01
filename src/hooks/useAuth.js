import { useCallback, useMemo } from 'react';

const useAuth = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || '';
  const cursoIdsStr = localStorage.getItem('cursoIds') || '[]';

  const cursoIds = useMemo(() => {
    try {
      return JSON.parse(cursoIdsStr);
    } catch (e) {
      return [];
    }
  }, [cursoIdsStr]);

  const logout = useCallback(() => {
    localStorage.clear();
  }, []);

  const saveSession = useCallback(({ token, nome, role, cursoIds }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', nome);
    localStorage.setItem('userRole', role);
    localStorage.setItem('cursoIds', JSON.stringify(cursoIds || []));
  }, []);

  const isAuthenticated = !!token;
  const isAdmin = userRole === 'ADMIN';
  const isCoordenador = userRole === 'COORDENADOR';
  const isAluno = userRole === 'ALUNO';

  return useMemo(() => ({
    token, 
    userName, 
    userRole, 
    cursoIds, 
    isAuthenticated, 
    isAdmin, 
    isCoordenador, 
    isAluno, 
    logout, 
    saveSession 
  }), [token, userName, userRole, cursoIds, isAuthenticated, isAdmin, isCoordenador, isAluno, logout, saveSession]);

};

export default useAuth;

