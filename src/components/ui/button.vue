<style lang="scss" scoped>
    .v-button {
        appearance: none;
        background-color: $blue;
        border-radius: 3px;
        border: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
        color: #fefefe;
        cursor: pointer;
        display: inline-block;
        outline: 0;
        padding: 12px 20px;
        text-decoration: none;
        transform: translateY(0);
        transition: all 150ms ease;

        &:hover {
            background-color: darken($blue, 5%);
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

        // determine the button's tag name
        let TagName = 'button';

        if (context.props.to) {
            TagName = 'router-link';
        } else if (context.props.href) {
            TagName = 'a';
        }

        return <TagName
            class="v-button"
            href={context.props.href}
            to={context.props.to}
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
