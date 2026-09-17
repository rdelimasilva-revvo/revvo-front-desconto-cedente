import { getGlobalCompanyId } from '../../lib/globalState'; 
import { supabaseAdmin } from '../../lib/supabase';
import { useState, useEffect } from 'react';
import InviteUserModal from './InviteUserModal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import UserRoleModal from '../UserRoleModal';
  
const UserProfilesHeader = ({ supabase, roles, onInviteSuccess }) => {
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Perfis e Acessos</h2>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsRoleModalOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Novo Cargo
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          style={{ minHeight: 40 }}
          onClick={() => setInviteModalOpen(true)}
        >
          Convidar Usuário
        </button>
      </div>
      {isInviteModalOpen && (
        <InviteUserModal
          roles={roles}
          companyId={getGlobalCompanyId()}
          onClose={() => setInviteModalOpen(false)}
          onSuccess={onInviteSuccess}
        />
      )}

        <UserRoleModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          onSave={() => {
            setIsRoleModalOpen(false);
            loadRoles();
          }}
        />
    </div>
  );
};

export default UserProfilesHeader;