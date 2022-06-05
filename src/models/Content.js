import { Model, Collection } from 'js-abstract-model'
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'

class Content extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: API_ADDRESS.content.base
      },
      { key: 'id' },
      { key: 'title' },
      { key: 'summary' },
      { key: 'text' },
      {
        key: 'creator_info',
        relatedModel: User
      },

      { key: 'type' },
      { key: 'category' },
      { key: 'category_info' },
      { key: 'creation_time' },
      { key: 'creator' },
      { key: 'description' },
      { key: 'duration' },
      { key: 'file' },
      { key: 'iframe_code' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'is_live_streaming' },
      { key: 'last_modification_time' },
      { key: 'script_code' },
      { key: 'thumbnail' },
      { key: 'url' }
    ])
  }
}

class ContentList extends Collection {
  model () {
    return Content
  }
}

export { Content, ContentList }
