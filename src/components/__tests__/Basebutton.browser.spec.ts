import { describe, it, expect } from 'vitest'
import BaseButton from '../BaseButton.vue'
import { render } from 'vitest-browser-vue'
import { page } from '@vitest/browser/context'
import type { Component } from 'vue'

// Define stories for BaseButton variants
const buttonStories = [
  {
    name: 'Primary Medium',
    props: { variant: 'primary', size: 'medium' },
    slots: { default: 'Primary Button' },
  },
  {
    name: 'Secondary Medium',
    props: { variant: 'secondary', size: 'medium' },
    slots: { default: 'Secondary Button' },
  },
  {
    name: 'Outline Medium',
    props: { variant: 'outline', size: 'medium' },
    slots: { default: 'Outline Button' },
  },
  {
    name: 'Primary Medium Disabled',
    props: { variant: 'primary', size: 'medium', disabled: true },
    slots: { default: 'Disabled Button' },
  },
  {
    name: 'Primary Small',
    props: { variant: 'primary', size: 'small' },
    slots: { default: 'Small Button' },
  },
  {
    name: 'Primary Medium - Medium Button',
    props: { variant: 'primary', size: 'medium' },
    slots: { default: 'Medium Button' },
  },
  {
    name: 'Primary Large',
    props: { variant: 'primary', size: 'large' },
    slots: { default: 'Large Button' },
  },
]

interface Story<T> {
  name: string
  props: Record<string, any>
  slots: Record<string, string>
}

// Helper function to generate DOM for stories
function renderStories<T>(component: Component, stories: Story<T>[]): HTMLElement {
  // Create a container for all stories
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.flexDirection = 'column'
  container.style.gap = '16px'
  container.style.padding = '20px'
  container.style.backgroundColor = '#ffffff'

  // Render each story with a label
  stories.forEach((story) => {
    const storyWrapper = document.createElement('div')

    // Add a label for the story
    const label = document.createElement('h3')
    label.textContent = story.name
    storyWrapper.appendChild(label)

    // Render the component with props and slots
    const { container: storyContainer } = render(component, {
      props: story.props,
      slots: story.slots,
    })
    storyWrapper.appendChild(storyContainer)

    container.appendChild(storyWrapper)
  })

  return container
}

// Helper function to take and compare screenshots
async function takeAndCompareScreenshot(name: string, element: HTMLElement) {
  const screenshotDir = './__screenshots__'
  const snapshotDir = './__snapshots__'
  const screenshotPath = `${screenshotDir}/${name}.png`

  // Append element to body
  document.body.appendChild(element)

  // Take screenshot
  const screenshot = await page.screenshot({
    path: screenshotPath,
    base64: true,
  })

  // Compare base64 snapshot
  await expect(screenshot.base64).toMatchFileSnapshot(`${snapshotDir}/${name}.snap`)

  // Save PNG for reference
  await expect(screenshot.path).toBeTruthy()

  // Cleanup
  document.body.removeChild(element)
}

describe('BaseButton', () => {
  describe('visual regression', () => {
    it('should match all button variants snapshot', async () => {
      const container = renderStories(BaseButton, buttonStories)
      await expect(
        takeAndCompareScreenshot('all-button-variants', container),
      ).resolves.not.toThrow()
    })
  })
})
