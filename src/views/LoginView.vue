<script setup>
import { useLoginPage } from '../composables/useLoginPage';

const { username, password, errorMessage, handleSubmit } = useLoginPage();
</script>

<template>
  <div class="login-view">
    <h1 class="title-section">Inicio de sesión</h1>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input 
          v-model="username" 
          type="text" 
          id="username" 
          required 
          placeholder="Jane"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          required 
          placeholder="Password"
        />
      </div>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      <button type="submit" class="btn btn--cta login-btn">
        Entrar
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.login-form {
  background: #fdfdfd;
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark);
}

.form-group input {
  height: 42px;
  padding: 0 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.error-msg {
  color: #dc3545;
  font-size: 0.85rem;
  margin: 0;
}

.login-btn {
  width: 100%;
  height: 45px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>