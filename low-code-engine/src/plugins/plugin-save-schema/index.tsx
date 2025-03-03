import { IPublicEnumTransformStage, IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Message } from '@alifd/next';
import { saveSchema } from '../../services/mockService';
import { project } from '@alilc/lowcode-engine';
import api from '../../../utils/axios';

// 保存功能示例
const SaveSchemaPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const doPreview = () => {
        let schema = project.exportSchema(IPublicEnumTransformStage.Save);
        console.log(schema);
        const blob = new Blob([JSON.stringify(schema)], { type: 'application/json' });
        const file = new File([blob], 'schema.json', { type: 'application/json' });
        api
          .uploadFile('http://127.0.0.1:7001/api/upload', file) // 假设后端接口是 /upload
          .then((response) => {
            Message.success('成功保存到本地');
          })
          .catch((error) => {
            Message.error('上传失败，请重试');
          });
      };
      skeleton.add({
        name: 'saveSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button type="primary" onClick={() => doPreview()}>
            上传页面到云端
          </Button>
        ),
      });
    },
  };
};
SaveSchemaPlugin.pluginName = 'SaveSchemaPlugin';
SaveSchemaPlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default SaveSchemaPlugin;
