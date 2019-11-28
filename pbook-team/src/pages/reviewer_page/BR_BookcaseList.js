import React from 'react'
import { Link } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'
import ReviewerBlogEdit from '../ReviewerBlogEdit'
import ScrollToTop from '../../pages/activities/components/ScrollToTop'

class BR_BookcaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         opened: null,
         total:this.props.likebook,
         total:this.props.readbook,
        }
        this.handleOpened.bind(this)
     }
     // 讚數
     count = value => {
         this.setState({
           total: this.state.total + value
         })
     }
    //  閱讀數
        count = value => {
            this.setState({
            total: this.state.total + value
            })
        }
    //  裝填
     handleOpened = (opened) => {
         this.setState({ opened })
    }
     render() {
        const { opened } = this.state;
        const { sid } = this.props;
        const { name } = this.props;
        const { number } = this.props;
        const { blog } = this.props;
        const { vb_book_sid } = this.props;
        const { br_name } = this.props;

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'))

    // 點擊more圖示導向書籍詳細列
    let Hash = `${vb_book_sid}`
        return (
            <>
        {/* <ScrollToTop> */}
        <section className="ReviewerListAllBox_Bookcase">
            {/* 書籍圖片 */}
          <div className="brAvatarAllBox_Bookcase" id={this.props.sid} onClick={() => this.handleOpened(this.state.opened === 'blog' ? null : 'blog')}>
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images_books/vb_9789578587823.jpg`)}/> */}
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images/${this.props.pic}`)}/> */}
            <img className="brBookInfoImg_Bookcase" src={`http://localhost:5555/images/books/${this.props.pic}`} alt=""/>
            
            {/* <img className="brBookInfoImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${this.props.pic}`} alt=""/> */}
            </div>

             <div className="bookInfoRWD">
                <div className="bookName_Bookcase">書名：{this.props.name}</div>
                <div className="bookName_Bookcase">作者：{this.props.author}</div>
            </div>

          <div className="brInfoBox_Bookcase borderLineUpDown">
          {/* <h4 className="h4_br">書籍簡介</h4> */}
                    <div className="blurBar"></div>
                <div className="brInfoTextBox_Bookcase">

                    <div className="bookInfo">
                        <div className="bookNameBox_Bookcase">
                            <div className="bookName_Bookcase">書名：</div>
                            <div className="bookNameText_Bookcase">{this.props.name}</div>
                        </div>
                        <div className="brAuthorText">作者：{this.props.author}</div>
                    </div>
                    {/* 書櫃區的簡介內文 */}
                    <h5 className="h5_title">{this.props.title}</h5>
                       <div className="brInfoText_Bookcase" dangerouslySetInnerHTML={{__html:this.props.blog? this.props.blog:this.props.introduction}}></div>
                </div>
                        
                    {/* 看更多 more (圖示) */}
                        <Link to={`/books/information/${Hash}`} className="brIconMore_Bookcase">
                                <img className="brMore_img" src={require('../reviewer_page/images/icon_Store.png')}/>
                        </Link>

            {/* 編輯模式按鈕 */}
                    <div className="Animate_Edit_Box">
                        <div className="Animate_Edit_btn" onClick={() => this.handleOpened(opened === 'edit' ? null : 'edit')}>
                            <img className="icon_Blog_Edit" src={require('../reviewer_page/images/icon_Blog_Edit.png')}/>
                            <h5 className="text_Blog_Edit">編輯模式</h5>
                        </div>
                    </div>

            {/* 收藏書籍 (圖示) */}
            <div className="brIconBox_Bookcase">
                <Link to={`/books/information/${Hash}`} className="brIconShare_Bookcase">
                        <img className="brMark_img" src={require('../reviewer_page/images/icon_shaer.png')}/>
                </Link>
                
                        <div className="brLikeBox">
            {/* 讚數、閱讀數 */}
                           <img className="brMark_img" onClick={()=>this.count(1)} src={require('../reviewer_page/images/icon_likebook.png')}/>
                                <span className="brMark_p">{this.state.total}</span>
                                {/* <span className="brMark_p">{this.props.likebook}</span> */}
                           <img onClick={() => (this.handleOpened(opened === 'blog' ? null : 'blog'))} onMouseDown={()=>this.count(1)} className="brMark_img_noAni" src={require('../reviewer_page/images/icon_readbook.png')}/>
                                <span className="brMark_p">{this.props.readbook}</span>
                        </div>
            {/* 分享功能 */}
                    <div className="fbBox">
                        <div className="fb-share-button" 
                            data-href='https://i.imgur.com/PKtu1i4.png'
                            data-layout="button_count">
                        </div>
                    </div>
              </div>
    </div>
            {/* 評分組件區塊 */}
    {/* <div className="brStarBox_Bookcase borderLine"></div> */}
    </section>
    {/* 切換文章 與 編輯 */}                   {/* onHandleOpen 爺爺打孫女 brBlog brBlogList */}
    {opened === 'blog' && <ReviewerBlog sid={sid} opened={opened} onHandleOpen={this.handleOpened}/>}
    {opened === 'edit' && <ReviewerBlogEdit sid={sid} name={name} number={number} opened={opened} onHandleOpen={this.handleOpened} blog={blog} br_name={br_name}/>}

        {/* <div style={{height:'30px'}}></div> */}
        {/* </ScrollToTop> */}
        </>
        )
    }
}

export default BR_BookcaseList