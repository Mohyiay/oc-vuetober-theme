<style lang="scss" scoped>
    $color: #2196f3;

    .v-button {
        background-color: $color;
        border-radius: 3px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
        color: #fefefe;
        display: inline-block;
        padding: 12px 20px;
        text-decoration: none;
        transform: translateY(0);
        transition: all 150ms ease;

        &:hover {
            background-color: darken($color, 5%);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12),  0 2px 4px 0 rgba(0, 0, 0, 0.08);
            color: #fff;
            transform: translateY(-1px);
        }
    }
</style>

<script>
/* eslint-disable no-unused-vars */
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { href, to } = context.props;

        // determine the button's tag name
        let TagName = 'button';

        if (to) {
            TagName = 'router-link';
        } else if (href) {
            TagName = 'a';
        }

        return <TagName
            class="v-button"
            href={href}
            to={to}
            {...bindings}>
            {context.slots().default}
        </TagName>;
    },
    functional: true,
    props: {
        href: {
            type: String,
        },
        to: {
            type: [Object, String],
        },
    },
};
</script>
