import { annotate } from 'rough-notation';

type Annotation = ReturnType<typeof annotate>;

export function useAnnotate(elementId: string) {
  const observer = ref<IntersectionObserver | null>(null);
  const annotation = ref<Annotation | null>(null);

  onMounted(() => {
    const humanText = document.getElementById(elementId);
    if (!humanText) return;
    
    annotation.value = annotate(humanText, { type: 'underline', color: 'var(--pen-color)', padding: [0, 3, 0, 3] });

    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) annotation.value?.show();
        else annotation.value?.hide();
      },
      { threshold: 0 }
    );
    observer.value.observe(humanText);
  });

  onUnmounted(() => {
    const humanText = document.getElementById(elementId);
    if (observer.value && humanText) {
      observer.value.unobserve(humanText);
    }
  });
}
