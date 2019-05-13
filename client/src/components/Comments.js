import React, { Component } from "react"
import PropTypes from "prop-types"
import Loader from "./Loader"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        flexDirection: "column"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,

    },
    card: {
        maxWidth: 400,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily: "inherit",
        margin: 10
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#7A7A7A",
        },
    },

});

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            error: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    // As user writes username and comment, the state is updated
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // When comment is submitted, a newComment object is sent to be posted and the message field is reset.
    onSubmit = e => {
        e.preventDefault();
        const date = new Date()

        if (this.props.user) {
            const newComment = {
                itineraryId: this.props.itinerary._id,
                user: this.props.user.username,
                message: this.state.message,
                timestamp: date
            }
            this.props.addComment(newComment, this.props.itinerary._id)
            this.setState({
                message: ""
            })

        } else {
            this.setState({
                error: "Please log in to post comments."
            })
        }

    }

    // Function to delete the message when the corresponding icon is clicked
    onDeleteClick = id => {
        this.props.deleteComment(id)
    }

    render() {
        const { classes } = this.props;
        const comments = this.props.comments.comments
        const isLoading = this.props.comments.loading

        const commentList = comments.map(comment =>
            <div key={comment._id}>
                <Card className="comment-card">
                    <CardContent>
                        <div className="comment-header">
                            <p className="comment-user">{comment.user}</p>
                            <IconButton aria-label="Delete" className="comment-delete" onClick={this.onDeleteClick.bind(this, comment._id)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <p>{comment.message}</p>
                    </CardContent>
                </Card>
            </div>)


        return (
            <div>
                <h4>Comments</h4>
                <form onSubmit={this.onSubmit} id="comment-form">

                    <Input
                        placeholder="Your Comment"
                        classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                        }}
                        value={this.state.message}
                        name="message"
                        onChange={this.onChange}
                    />
                    <Button variant="contained" className={classes.button} size="small" type="submit" form="comment-form">
                        Send
                    </Button> <p>{this.state.error}</p>
                </form>
                <div>{isLoading ? (<Loader />) : (<div>{comments.length === 0 ? (<p>No comments yet.</p>) : (<div>{commentList}</div>)}</div>)
                }</div>
            </div>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.object,
    classes: PropTypes.object,
    addComment: PropTypes.func,
    match: PropTypes.object,
    itinerary: PropTypes.object,
    deleteComment: PropTypes.func,
    user: PropTypes.object
}

export default withStyles(styles)(Comments)