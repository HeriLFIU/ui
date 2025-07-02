import { mount, shallowMount } from "@vue/test-utils";
import AccordionItem from "@/components/kytos/accordion/AccordionItem.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";

describe("AccordionItem.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(AccordionItem).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("True defaultState", async () => {
      wrapper = mount(AccordionItem, {
        attachTo: document.body,
        props: {
          defaultState: true,
        },
        slots: {
          default: '<div data-test="test">Test</div>',
        },
      });
      expect(wrapper.exists()).toBe(true);
      const div = wrapper.find('[data-test="test"]');
      const checkbox = wrapper.get('[data-test="main-accordionitem"]');

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);
    });

    test("False defaultState", async () => {
      wrapper = mount(AccordionItem, {
        attachTo: document.body,
        props: {
          defaultState: false,
        },
        slots: {
          default: '<div data-test="test">Test</div>',
        },
      });
      expect(wrapper.exists()).toBe(true);
      const div = wrapper.find('[data-test="test"]');
      const checkbox = wrapper.get('[data-test="main-accordionitem"]');

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });
  });

  describe("Slots", () => {
    test("AccordionItem Single elements in Slot", () => {
      wrapper = mount(AccordionItem, {
        slots: {
          default: '<div data-test="test">Test</div>',
        },
      });
      expect(wrapper.exists()).toBe(true);
      const div = wrapper.find('[data-test="test"]');

      expect(div.exists()).toBe(true);
      expect(div.text()).toBe("Test");
    });

    test("AccordionItem Multiple elements in Slot", async () => {
      wrapper = mount(AccordionItem, {
        slots: {
          default: [
            '<div data-test="test">Test1</div>',
            '<div data-test="test">Test2</div>',
            '<div data-test="test">Test3</div>',
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);

      const divs = wrapper.findAll('[data-test="test"]');
      expect(divs.length).toBe(3);
    });
  });

  describe("User Interactions", () => {
    test("Open/Close AccordionItem", async () => {
      wrapper = mount(AccordionItem, {
        attachTo: document.body,
        slots: {
          default: '<div data-test="test">Test</div>',
        },
      });
      expect(wrapper.exists()).toBe(true);
      const div = wrapper.find('[data-test="test"]');
      const checkbox = wrapper.get('[data-test="main-accordionitem"]');

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("Accordion Item", () => {
      wrapper = mount(AccordionItem);
      expect(wrapper.exists()).toBe(true);

      expect(wrapper.find('[data-test="main-accordionitem"]').exists()).toBe(
        true
      );
    });
  });
});
