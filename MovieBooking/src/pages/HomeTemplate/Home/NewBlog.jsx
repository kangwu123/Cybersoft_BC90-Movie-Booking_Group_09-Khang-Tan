import styled from 'styled-components';
import Slider from 'react-slick';

const NewBlogWrapper = styled.div`
  padding: 0 2em;
  background-color: #000000;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  position: relative;
  color: #FFC107;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 4px;
    background-color: #f39c12;
    margin: 0 15px;
  }
`;

const NewsContainer = styled.div`
  padding: 20px;
  background-color: #acacac;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
  align-items: flex-start;
  height: 1120px;
`;

const MainNews = styled.div`
  flex: 3;
`;

const MainNewsImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const NewsTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 20px;
  color: #333;
`;

const ReadMoreLink = styled.a`
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SideNewsWrapper = styled.div`
  flex: 2;
  position: relative;
  padding: 30px 0;

  .slick-slider {
    height: 100%;
  }
  .slick-list {
    height: 100% !important;
  }
  .slick-track {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const SideNewsItem = styled.div`
  display: flex !important;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

const SideNewsImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const SideNewsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeeMoreButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const NewBlog = () => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 10,
        slidesToScroll: 10,
        vertical: true,
        verticalSwiping: true,
        autoplay: false,
        autoplaySpeed: 1000,
        arrows: false,
        pauseOnHover: true,
    };

    const newsData = [
        {
            id: 1,
            title: '[Review] Predator Badlands: Sự Hồi Sinh Của Thương Hiệu Quái Thú Lừng Lẫy',
            image: '/img/News/news1.jpg',
        },
        {
            id: 2,
            title: '[Review] Avatar Fire and Ashes: Nhiều trang phê bình uy tín đã dành lời khen ngợi cho tác phẩm. Rotten Tomatoes gọi đây là một "kỳ quan thị giác không thể chối từ". Variety đánh giá công nghệ Motion Capture đã đạt đến cảnh giới mới, xóa nhòa ranh giới giữa diễn viên thực và nhân vật kỹ thuật số',
            image: '/img/News/news2.jpg',
        },
        {
            id: 3,
            title: '[News] Night Patrol 2026 một bộ phim kinh dị hành động hoặc một trò chơi visual novel kinh dị, trong đó phim kể về cảnh sát Los Angeles đối đầu một nhóm tội phạm bí ẩn, còn game xoay quanh nhóm nhạc ảo PLAVE điều tra bí ẩn trường học',
            image: '/img/News/news5.jpg',
        },
        {
            id: 4,
            title: '[News] Thỏ Ơi 2026 -Phim Tết Thỏ Ơi mang hai tông màu chính là đỏ và đen. Trung tâm là một người đẹp mặc đầm đỏ bí ẩn, tay cầm chiếc mặt nạ thỏ. Đáng nói nhân vật chính có gương mặt khuất trong bóng tối, chỉ lấp ló bờ môi',
            image: '/img/News/news6.jpg',
        },
        {
            id: 5,
            title: '[News] Killer Whale UpComming 2026 - Hold your breath as you witness revenge rise from the deep. After a life-shattering tragedy, Trish tries to comfort her best friend, Maddie, by taking her on a spectacular adventure in a private lagoon halfway across the world. Their peaceful retreat soon becomes a terrifying fight to stay alive when the ocean most bloodthirsty predator seeks vengeance for a brutal life in captivity',
            image: '/img/News/news7.jpg',
        },
        {
            id: 6,
            title: '[Review] Trái Tim Què Quặt: Hai Mối Tình Và Một Vụ Án Mạng',
            image: '/img/News/news3.jpg',
        },
        {
            id: 7,
            title: '[Review] Cục Vàng Của Ngoại: Việt Hương - Hồng Đào Lấy Nước Mắt Khán Giả',
            image: '/img/News/news4.jpg',
        },
        {
            id: 8,
            title: '[News] ANACONDA: ĐỤNG ĐỘ SIÊU TRĂN Một nhóm bạn đang trải qua khủng hoảng tuổi trung niên. Họ quyết định làm lại bộ phim yêu thích thuở trẻ, nhưng lại gặp phải những sự cố ngoài mong đợi khi tiến vào khu rừng.',
            image: '/img/News/news8.jpg',
        },
        {
            id: 9,
            title: '[News] Mercy 2026 “In the near future, a detective (Chris Pratt) stands on trial accused of murdering his wife. He has 90 minutes to prove his innocence to the advanced A.I. Judge (Rebecca Ferguson) he once championed, before it determines his fate.Kind of reminds me of Minority Report. But I’m totally watching this film: want to see how the whole thing will turn out.',
            image: '/img/News/news9.jpg',
        },
        {
            id: 10,
            title: '[News] Return to Sillent Hill 2026: When a mysterious letter calls him back to Silent Hill in search of his lost love, James (Jeremy Irvine) finds a once-recognizable town and encounters terrifying figures both familiar and new, and begins to question his own sanity.',
            image: '/img/News/news10.jpg',
        }
    ];

    const mainNews = newsData[0];
    const sideNews = newsData.slice(1);

    return (
        <NewBlogWrapper>
            <SectionTitle>NEWS & REVIEWS</SectionTitle>
            <NewsContainer>
                <MainNews>
                    <MainNewsImage src={mainNews.image} alt={mainNews.title} />
                    <NewsTitle>{mainNews.title}</NewsTitle>
                    <ReadMoreLink href="#">Read more &gt;&gt;</ReadMoreLink>
                </MainNews>

                <SideNewsWrapper>
                    <Slider {...settings}>
                        {sideNews.map((item, index) => (
                            <SideNewsItem key={index}>
                                <SideNewsImage src={item.image} alt={item.title} />

                                <SideNewsContent>
                                    <NewsTitle style={{
                                        fontSize: '14px',
                                        marginTop: 0,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>{item.title}</NewsTitle>

                                    <ReadMoreLink href="#">Read more &gt;&gt;</ReadMoreLink>
                                </SideNewsContent>
                            </SideNewsItem>
                        ))}
                    </Slider>
                </SideNewsWrapper>
            </NewsContainer>

            <SeeMoreButton>SEE MORE NEWS</SeeMoreButton>
        </NewBlogWrapper>
    );
};

export default NewBlog;