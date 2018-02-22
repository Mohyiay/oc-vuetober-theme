<script>
export default {
  render() {
    const bindings = { class: [] };

    bindings.class.push('text-center');

    return <div class="bg-green py-4 px-3" {...bindings}>
      <h2>foo</h2>
      <button class="bg-orange">ok!</button>
    </div>;
  },
  functional: true,
};
</script>
