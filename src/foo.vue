<script>
export default {
  render() {
    const bindings = { class: ['bg-blue', 'py-2', 'text-center'] };

    return <div {...bindings}>
      <h2 class="mt-2 inline-block">foo</h2>
      <button class="bg-orange py-2 px-4 inline-block rounded shadow">ok!</button>
    </div>;
  },
  functional: true,
};
</script>
