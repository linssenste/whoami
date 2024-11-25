<!-- pages/[...catchAll].vue -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/') // Redirect to the home page
</script>
