import { describe, it, expect } from 'vitest'
import BaseButton from '../BaseButton.vue'
import { mount } from '@vue/test-utils'

describe('BaseButton', () => {
    it('should render', () => {
        const wrapper = mount(BaseButton)
        expect(wrapper.html()).toContain('button')
    })
})
