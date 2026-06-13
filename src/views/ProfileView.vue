<script setup>
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    cartStore.clearCart();
    router.push('/login');
}

const formatDate = (dateString) => {
    if(!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}
</script>

<template>
  <div class="profile-view" v-if="authStore.user">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-wrapper">
          <img 
            :src="authStore.user.profileImg" 
            :alt="authStore.user.name" 
            class="profile-avatar"
          />
          <span class="status-badge"></span>
        </div>
        <h2 class="user-fullname">{{ authStore.user.name }} {{ authStore.user.surname }}</h2>
        <p class="user-username">@{{ authStore.user.username }}</p>
      </div>
      <hr class="divider" />
      <div class="profile-body">
        <div class="info-section">
          <h3>Sobre mí</h3>
          <p class="user-bio">{{ authStore.user.bio || 'Este usuario aún no ha escrito ninguna biografía.' }}</p>
        </div>
        <div class="info-meta">
          <div class="meta-item">
            <i class="fas fa-id-card meta-icon"></i>
            <div>
              <span class="meta-label">ID de Usuario</span>
              <span class="meta-value">#{{ authStore.user.id }}</span>
            </div>
          </div>
          <div class="meta-item" v-if="authStore.user.registrationDate">
            <i class="fas fa-calendar-alt meta-icon"></i>
            <div>
              <span class="meta-label">Miembro desde</span>
              <span class="meta-value">{{ formatDate(authStore.user.registrationDate) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <button @click="handleLogout" class="btn btn-logout">
          <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
  <div v-else class="profile-loading">
    <p>Cargando datos del perfil...</p>
  </div>
</template>

<style scoped>
.profile-view {
  max-width: 500px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.profile-card {
  background: #fdfdfd;
  border: 1px solid #eef0f2;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.profile-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color, #42b983);
  padding: 3px;
  background: #fff;
}

.status-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 14px;
  height: 14px;
  background-color: #2ecc71;
  border: 2px solid #fff;
  border-radius: 50%;
}

.user-fullname {
  font-size: 1.5rem;
  color: var(--dark, #2c3e50);
  margin: 0;
  font-weight: 700;
}

.user-username {
  font-size: 0.9rem;
  color: var(--grey, #7f8c8d);
  margin: 0.2rem 0 0 0;
}

.divider {
  border: 0;
  height: 1px;
  background: #f1f5f9;
  margin: 0;
}

.profile-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section h3 {
  font-size: 1rem;
  color: var(--dark, #2c3e50);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.user-bio {
  font-size: 0.95rem;
  color: #57606f;
  line-height: 1.5;
  margin: 0;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #f1f2f6;
}

/* metadatos */
.info-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.meta-icon {
  font-size: 1.1rem;
  color: var(--primary-color, #42b983);
  background: rgba(66, 185, 131, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  color: var(--grey, #7f8c8d);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  display: block;
  font-size: 0.95rem;
  color: var(--dark, #2c3e50);
  font-weight: 500;
}

/* acciones */
.profile-actions {
  margin-top: 1rem;
}

.btn-logout {
  width: 100%;
  height: 45px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ff4757;
  color: #ff4757;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #ff4757;
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
}

.profile-loading {
  text-align: center;
  margin-top: 4rem;
  color: var(--grey);
}
</style>