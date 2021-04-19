import WangEditor from 'wangeditor'

const NAME = 'fcEditor';

let uni = 1;

export default {
    name: NAME,
    props: {
        value: String,
        init: Function,
        disabled: Boolean,
    },
    data() {
        return {
            editor: {},
            uni: uni++,
        }
    },
    watch: {
        disabled {
            handler: function (n) {
                n ? this.editor.disable() : this.editor.enable();
            },
            immediate: true
        },
        value(n) {
            if (n !== this.editor.txt.html()) {
                this.editor.txt.html(n);
            }
        }
    },
    methods: {
        result() {
            this.$emit('input', this.editor.txt.html())
        }
    },
    mounted() {
        this.editor = new WangEditor(`#editor${this.uni}`);
        this.editor.config.zIndex = 2;
        this.init && this.init(this.editor);
        this.editor.create();
        this.editor.txt.html(this.value);
    },
    render() {
        return <div on-input={this.result} id={`editor${this.uni}`} style="line-height: normal;"/>
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    }
}
