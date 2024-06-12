import { annotate } from 'rough-notation';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

type Annotation = ReturnType<typeof annotate>;

export function useAnnotate(elementId: string, toggle?: () => boolean, lineType = 'underline', delay = 0) {
  const observer = ref<IntersectionObserver | null>(null);
  const annotation = ref<Annotation | null>(null);

  const setupAnnotation = () => {
    const humanText = document.getElementById(elementId);
    if (!humanText) return;

    annotation.value = annotate(humanText, {
      type: lineType as any,
      color: 'var(--pen-color)',
      padding: lineType == 'underline' ? [0, 3, 0, 3] : [5, 5],
	  multiline: true
    });

    if (toggle) {
      watchEffect(() => {
        if (toggle()) {
          setTimeout(() => {
            annotation.value?.show();
          }, delay);
        } else {
          annotation.value?.hide();
        }
      });
    } else {
      observer.value = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) annotation.value?.show();
          else annotation.value?.hide();
        },
        { threshold: 0 }
      );
      observer.value.observe(humanText);
    }
  };

  onMounted(() => {
    setupAnnotation();
  });

  onUnmounted(() => {
    const humanText = document.getElementById(elementId);
    if (observer.value && humanText) {
      observer.value.unobserve(humanText);
    }
  });
}
