<template>
    <button :class="[
        'button',
        `button--${size}`,
        `button--${variant}`,
        { 'button--disabled': disabled }
    ]" :disabled="disabled" @click="$emit('click', $event)">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
interface Props {
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary' | 'outline'
    disabled?: boolean
}

defineProps<Props>()
defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

/* Size modifiers */
.button--small {
    padding: 8px 16px;
    font-size: 14px;
}

.button--medium {
    padding: 12px 20px;
    font-size: 16px;
}

.button--large {
    padding: 16px 24px;
    font-size: 18px;
}

/* Variant modifiers */
.button--primary {
    background-color: #4f46e5;
    color: white;
}

.button--primary:hover {
    background-color: #4338ca;
}

.button--secondary {
    background-color: #9ca3af;
    color: white;
}

.button--secondary:hover {
    background-color: #6b7280;
}

.button--outline {
    background-color: transparent;
    border: 2px solid #4f46e5;
    color: #4f46e5;
}

.button--outline:hover {
    background-color: #4f46e5;
    color: white;
}

/* State modifiers */
.button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.button--disabled:hover {
    opacity: 0.5;
}
</style>
